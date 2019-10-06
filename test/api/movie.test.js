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
          res.body.should.be.a("object");
          res.body.should.have.property("title");
          res.body.should.have.property("director_Id");
          res.body.should.have.property("category");
          res.body.should.have.property("country");
          res.body.should.have.property("year");
          res.body.should.have.property("imdb_score");
          res.body.should.have.property("date");
          movieId = res.body._id;
          done();
        });
    });
  });

  describe("/GET/:director_id movie", () => {
    it("it should get a movie by the given id", done => {
      console.log(movieId);
      chai
        .request(server)
        .get("/api/movie/" + movieId)
        .set("x-access-token", token)
        .end((err, res) => {
          if (err) {
            console.log(err);
          } else {
            res.should.have.status(200);
            res.body.should.be.a("array");
            res.body[0].should.have.property("title");
            res.body[0].should.have.property("director_Id");
            res.body[0].should.have.property("category");
            res.body[0].should.have.property("country");
            res.body[0].should.have.property("year");
            res.body[0].should.have.property("imdb_score");
            res.body[0].should.have.property("date");
            res.body[0].should.have.property("_id").eql(movieId);
            done();
          }
        });
    });
  });

  describe("/PUT movie", () => {
    it("it should PUT a movie", done => {
      const movie = {
        title: "Merhaba Dünya",
        director_Id: "5d8913b62d32a200e84b1d86",
        category: "Komedi",
        country: "Netherland",
        year: 2019,
        imdb_score: 6
      };

      chai
        .request(server)
        .put("/api/movie/" + movieId)
        .send(movie)
        .set("x-access-token", token)
        .end((err, res) => {
          res.should.have.status(200);
          console.log(res.body);
          res.body.should.be.a("object");
          res.body.should.have.property("statusCode").eql(1);
          res.body.should.have.property("message").eql("Success!");
          done();
        });
    });
  });

  describe("/DELETE movie", () => {
    it("it should delete a movie", done => {
      chai
        .request(server)
        .delete("/api/movie/" + movieId)
        .set("x-access-token", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("statusCode").eql(1);
          res.body.should.have.property("message");
          done();
        });
    });
  });
});
