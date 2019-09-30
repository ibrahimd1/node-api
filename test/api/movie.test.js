const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../../app.js");

chai.use(chaiHttp);

let token;

describe("/api/movies tests", () => {
  before(done => {
    chai
      .request(server)
      .post("/authenticate")
      .send({ userName: "idarakcilar", passWord: "12345" })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  describe("/GET/movies", () => {
    it("it should GET all the movies", done => {
      chai
        .request(server)
        .get("/api/movie")
        .set("x-access-token", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a("array");
          done();
        });
      done();
    });
  });
});
