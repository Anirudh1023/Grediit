//jshint esversion:6

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.set("view engine", "ejs");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://venkatakesavvenna:mAGTnKvjihzNDRLZ@cluster2.ibwcabn.mongodb.net/MyTable?retryWrites=true&w=majority", {
  useNewUrlParser: true,
});

const iitschema = new mongoose.Schema({
  Email: String,
  Username: String,
  Firstname: String,
  Lastname: String,
  Age: String,
  Phone: String,
  Password: String,
});

const postschema = new mongoose.Schema({
  CreatedIn: String,
  CreatedBy: String,
  Content: String,
  Upvotes: Array,
  Downvotes: Array,
  Comments: Array,
});

const subschema = new mongoose.Schema({
  CreatedBy: String,
  Title: String,
  Content: String,
  Image: String,
  Bannedkeywords: String,
  Posts: Number,
  Followers: Array,
  Blocked: Array,
  Requests: Array,
  Reports: Array,
  CreatedDate: String,
});

const Profile = mongoose.model("profile", iitschema);
const Subs = mongoose.model("sub", subschema);
const Posts = mongoose.model("post", postschema);

app.get("/api/", function (req, res) {
  res.json({ mess: "Hi" });
});

app.post("/api/", function (req, res) {
  Profile.findOne(
    { Email: req.body.Email, Password: req.body.Password },
    function (err, foundProfile) {
      if (!err) {
        if (!foundProfile) res.send("Doesn't exist");
        else res.send(foundProfile);
      } else {
        res.send(err);
      }
    }
  );
});

app
  .route("/api/profiles")
  .get(function (req, res) {
    Profile.find(function (err, foundProfiles) {
      if (!err) {
        console.log(foundProfiles);
        res.send(foundProfiles);
      } else {
        res.send(err);
      }
    });
  })

  .post(function (req, res) {
    const item = new Profile({
      Email: req.body.Email,
      Username: req.body.Username,
      Firstname: req.body.Firstname,
      Lastname: req.body.Lastname,
      Age: req.body.Age,
      Phone: req.body.Phone,
      Password: req.body.Password,
    });
    Profile.findOne({ Email: req.body.Email }, function (err, foundProfile) {
      if (!err) {
        if (foundProfile) {
          res.send("Already There");
        } else {
          item.save(function (err) {
            if (!err) {
              res.send("Your creds are " + item);
            } else {
              res.send(err);
            }
          });
        }
      } else {
        res.send(err);
      }
    });
  })

  .delete(function (req, res) {
    Profile.deleteMany(function (err) {
      if (!err) {
        res.send("Deleted!");
      } else {
        res.send(err);
      }
    });
  })

  .patch(function (req, res) {
    Profile.updateOne(
      { Email: req.body.Email },
      { $set: req.body },
      function (err) {
        if (!err) {
          res.send("Successfully updated!");
        } else {
          res.send(err);
        }
      }
    );
  });

app
  .route("/api/subs")
  .get(function (req, res) {
    Subs.find(function (err, foundSubs) {
      if (!err) {
        console.log(foundSubs);
        res.send(foundSubs);
      } else {
        res.send(err);
      }
    });
  })

  .post(function (req, res) {
    Subs.findOneAndDelete({ Title: req.body.Title }, function (err, foundSub) {
      if (!err) {
        if (foundSub) {
          res.send(foundSub);
        }
      } else {
        res.send(err);
      }
    });
  })

  .patch(function (req, res) {
    Subs.updateOne(
      { Title: req.body.Title },
      { $set: req.body },
      function (err) {
        if (!err) {
          res.send("Successfully updated!");
        } else {
          res.send(err);
        }
      }
    );
  })
  .delete(function (req, res) {
    Subs.deleteOne({ Title: req.body.Title }, function (err) {
      if (!err) {
        res.send("Delete");
      } else {
        res.send(err);
      }
    });
  });

app
  .route("/api/subs/:val")
  .get(function (req, res) {
    let created = req.params.val;
    console.log(created);
    Subs.find({ CreatedBy: created }, function (err, foundSubs) {
      if (!err) {
        console.log(foundSubs);
        res.send(foundSubs);
      } else {
        res.send(err);
      }
    });
  })

  .post(function (req, res) {
    let created = req.params.val;
    const item = new Subs({
      CreatedBy: req.params.val,
      Title: req.body.Title,
      Content: req.body.Content,
      Image: req.body.Image,
      Bannedkeywords: req.body.Bannedkeywords,
      Posts: req.body.Posts,
      Followers: req.body.Followers,
    });
    Subs.findOne({ Title: req.body.Title }, function (err, foundSub) {
      if (!err) {
        if (foundSub) {
          res.send(foundSub);
        } else {
          item.save(function (err) {
            if (!err) {
              res.send("Your subs are " + item);
            } else {
              res.send(err);
            }
          });
        }
      } else {
        res.send(err);
      }
    });
  })

  .delete(function (req, res) {
    Subs.deleteOne({ Title: req.body.Title }, function (err) {
      if (!err) {
        res.send("Deleted!");
      } else {
        res.send(err);
      }
    });
  });

app
  .route("/api/greds")
  .get(function (req, res) {
    Posts.find(function (err, found) {
      if (!err) {
        res.send(found);
      } else {
        res.send("No articles matching");
      }
    });
  })
  .delete(function (req, res) {
    Posts.deleteMany(function (err) {
      if (!err) {
        res.send("Deleted!");
      } else {
        res.send(err);
      }
    });
  });

app
  .route("/api/greds/:val")
  .get(function (req, res) {
    let gred = req.params.val;
    Posts.find({ CreatedIn: gred }, function (err, found) {
      if (!err) {
        res.send(found);
      } else {
        res.send("No articles matching");
      }
    });
  })
  .post(function (req, res) {
    let gred = req.params.val;
    const item = new Posts({
      CreatedIn: gred,
      CreatedBy: req.body.CreatedBy,
      Title: req.body.Title,
      Content: req.body.Content,
      Upvotes: req.body.Upvotes,
      Downvotes: req.body.Downvotes,
      Comments: req.body.Comments,
    });
    Posts.findOne({ Title: req.body.Title }, function (err, foundSub) {
      if (!err) {
        if (foundSub) {
          res.send("Already There");
        } else {
          item.save(function (err) {
            if (!err) {
              res.send("Your subs are " + item);
            } else {
              res.send(err);
            }
          });
        }
      } else {
        res.send(err);
      }
    });
  })
  // .put(function (req, res) {
  //   let art = req.params.val;
  //   Article.updateOne(
  //     { title: art },
  //     { title: req.body.title, content: req.body.content },
  //     function (err) {
  //       if (!err) {
  //         res.send("Successfully updated!");
  //       } else {
  //         res.send(err);
  //       }
  //     }
  //   );
  // })
  .patch(function (req, res) {
    let gred = req.params.val;
    Posts.updateOne(
      { CreatedIn: gred, Title: req.body.Title },
      { $set: req.body },
      function (err) {
        if (!err) {
          res.send("Successfully updated!");
        } else {
          res.send(err);
        }
      }
    );
  })
  .delete(function (req, res) {
    let gred = req.params.val;
    Posts.deleteOne({ title: gred }, function (err) {
      if (!err) {
        res.send("Deleted!");
      } else {
        res.send(err);
      }
    });
  });
////////////////////////////////////////////////////////////////

// app
//   .route("/articles/:val")
//   .get(function (req, res) {
//     let art = req.params.val;
//     Article.findOne({ title: art }, function (err, found) {
//       if (!err) {
//         res.send(found);
//       } else {
//         res.send("No articles matching");
//       }
//     });
//   })
//   .put(function (req, res) {
//     let art = req.params.val;
//     Article.updateOne(
//       { title: art },
//       { title: req.body.title, content: req.body.content },
//       function (err) {
//         if (!err) {
//           res.send("Successfully updated!");
//         } else {
//           res.send(err);
//         }
//       }
//     );
//   })
//   .patch(function (req, res) {
//     let art = req.params.val;
//     Article.updateOne({ title: art }, { $set: req.body }, function (err) {
//       if (!err) {
//         res.send("Successfully updated!");
//       } else {
//         res.send(err);
//       }
//     });
//   })
//   .delete(function (req, res) {
//     let art = req.params.val;
//     Article.deleteOne({ title: art }, function (err) {
//       if (!err) {
//         res.send("Deleted!");
//       } else {
//         res.send(err);
//       }
//     });
//   });
app.listen(5000, function () {
  console.log("Server started on port 5000");
});
