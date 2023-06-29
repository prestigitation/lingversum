let server = require("../index");

import { randEmail, randPassword, randUserName } from "@ngneat/falso";
import { test } from "mocha"
import { expect } from "chai";
import Container from "typedi";
import supertest from "supertest";
import http from "http";

import sequelizeConnectionAdapter from "../src/repositories/adapters/sequelizeConnectionAdapter";
import authRepository from "../src/repositories/authRepository";
import { EMAIL_MAX_LENGTH, EMAIL_MIN_LENGTH, NAME_MIN_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "../src/constants/userConstants";

const supertestInstance = supertest(http.createServer(server));

describe("AuthController", () => {
      beforeEach(() => {
         Container.get(sequelizeConnectionAdapter).connect()?.truncate();
      })
      describe("register method", () => {
         test("should register user with valid data", () => {
            supertestInstance.post("/register").send({
               email: randEmail(),
               name: randUserName(),
               password: randPassword()
            }).expect(201)
         });
         describe("should not pass validation with invalid data", () => {
            test("doesn`t pass the password without the remaining count of symbols", () => {
               supertestInstance.post("/register").send({
                  email: randEmail(),
                  name: randUserName(),
                  password: randPassword({length: PASSWORD_MIN_LENGTH - 1})
               }).expect(409)
            })
            test("doesn`t pass the password with the extra count of symbols", () => {
               supertestInstance.post("/register").send({
                  email: randEmail(),
                  name: randUserName(),
                  password: randPassword({length: PASSWORD_MAX_LENGTH + 1})
               }).expect(409)
            })

            test("doesn`t pass the email without the remaining count of symbols", () => {
               supertestInstance.post("/register").send({
                  email: randEmail({length: EMAIL_MIN_LENGTH - 1}),
                  name: randUserName(),
                  password: randPassword()
               }).expect(409)
            })
            test("doesn`t pass the email with the extra count of symbols", () => {
               supertestInstance.post("/register").send({
                  email: randEmail({length: EMAIL_MAX_LENGTH + 1}),
                  name: randUserName(),
                  password: randPassword()
               }).expect(409)
            })
            test("doesn`t pass the name without the remaining count of symbols", () => {
               supertestInstance.post("/register").send({
                  email: randEmail(),
                  name: randUserName({length: NAME_MIN_LENGTH - 1}),
                  password: randPassword()
               }).expect(409)
            })
            
            test("doesn`t pass when the extra field is provided", () => {
               supertestInstance.post("/register").send({
                  email: randEmail(),
                  name: randUserName(),
                  password: randPassword(),
                  someRandomField: randPassword()
               }).expect(409)
            })
         })
         test("should not pass if user with given email already exists", async () => {
            let existingEmail = randEmail();
            await Container.get(authRepository).createUser({ email: existingEmail, name: randUserName(), password: randPassword() });
            supertestInstance.post("/register").send({
               email: existingEmail,
               name: randUserName(),
               password: randPassword()
            }).expect(422)
         })
      })
      describe("login method", () => {
         test("should return token when a given credentials are valid", async () => {
            let user = await Container.get(authRepository).createUser({
               email: randEmail(), 
               name: randUserName(), 
               password: randPassword()
            });

            supertestInstance.post("/login").send({
               email: user.get("email"),
               password: user.get("password")
            }).then((response) => {
               expect(response.body).not.to.be.undefined;
               expect(response.body).to.be.string;
            });
         })
         test("should return 409 status code when a given credentials are invalid", () => {
            supertestInstance.post("/login").send({
               email: randEmail(),
               password: randPassword({length: PASSWORD_MIN_LENGTH - 1})
            }).expect(422)
         })
         test("should return 403 status when password in input is incorrect", async () => {
            let user = await Container.get(authRepository).createUser({
               email: randEmail(),
               name: randUserName(),
               password: randPassword()
            })
            supertestInstance.post("/login").send({
               email: user.get("email"),
               password: randPassword()
            }).expect(403)
         })
         test("should return 400 status when user is not found", async () => {
            supertestInstance.post("/login").send({
               email: randEmail(),
               password: randPassword()
            }).expect(403)
         })
      })
});