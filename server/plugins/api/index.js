"use strict";

const Promise = require("bluebird");
const fs = require("fs");
const Path = require("path");
const assert = require("assert");
const Data = require("../../../data");
const currencies = require("../../content/currencies");
const cloneDeep = require("lodash/cloneDeep");

const api = (server, options, next) => {
  server.route({
    method: "GET",
    path: "/image/favicon.ico",
    handler: function (request, reply) {
      reply.file(Path.join(__dirname, "../../../client/images/favicon.ico"));
    }
  });

  server.route({
    method: "GET",
    path: "/deal",
    handler: homeHandler
  });

  server.route({
    method: "POST",
    path: "/confirm",
    handler: confirmHandler
  });
  next();
};

function toCurr(str, currency) {
  const arr = str.split(" ");
  const curr = parseInt(arr[0].substring(1)) / currencies[currency];
  arr[0] = currency + curr.toFixed(2);
  return arr.join(" ");
}

function confirmHandler(request, reply) {
  const chosen = [];
  request.payload.offers.forEach((offer) => {
    if (request.payload.chosen.indexOf(offer.item_id) >= 0) {
      chosen.push(offer);
    }
  });
  const conf = request.payload;
  conf.chosen = chosen;
  delete conf.offers;
  reply(conf);
}

function homeHandler(request, reply) {
  if (request.query) {
    // console.log("here!");
    const info = {
      firstName: request.query.fn,
      lastName: request.query.ln,
      email: request.query.email,
      price: request.query.price,
      room: request.query.room,
      language: request.query.lg,
      currency: request.query.cr,
      short_desc: "",
      offers: []
    };

    const data = cloneDeep(Data);

    if (info.room === "QUEEN") {
      info.offers.push(data[1], data[2]);
      info.short_desc = data[0].short_desc;
    } else if (info.room === "KING") {
      info.offers.push(data[2]);
      info.short_desc = data[1].short_desc;
    } else if (info.room === "SUITE") {
      info.short_desc = data[2].short_desc;
    }

    if ((info.price * currencies[info.currency]) >= 199) {
      info.offers.push(data[3]);
    }

    info.offers.forEach((elem) => {
      elem.price = toCurr(elem.price, info.currency);
    });
    
    reply(info);
  }
}

api.attributes = {
  pkg: {
    name: "api",
    version: "1.0.0"
  }
};

module.exports = api;
