const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../../app.js");

chai.use(chaiHttp);

let token, movieId;

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

  describe("/GET movies", () => {
    it("it should GET all the movies", done => {
      chai
        .request(server)
        .get("/api/movie")
        .set("x-access-token", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });

  describe("/POST movie", () => {
    it("it should POST a movie", done => {
      const movie = {
        title: "Udemy",
        director_Id: "5d8922dc43bfcc3768bef804",
        category: "Komedi",
        country: "Turkey",
        year: 2000,
        imdb_score: 7
      };

      chai
        .request(server)
        .post("/api/movie")
        .send(movie)
        .set("x-access-token", token)
        .end((err, res) => {
          res.should.have.status(200);
          // res.body.should.be.a("object");
          res.body.should.have.property("title");
          res.body.should.have.property("director_Id");
          res.body.should.have.property("category");
          res.body.should.have.property("country");
          res.body.should.have.property("year");
          res.body.should.have.property("imdb_score");
          res.body.should.have.property("date");
          done();
        });
    });
  });
});