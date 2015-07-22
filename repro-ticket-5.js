var Items = new Mongo.Collection("items");

if (Meteor.isClient) {
  Meteor.subscribe("pubA");
  Meteor.subscribe("pubB");
  
  Template.test.helpers({
    debug: function () {
      return EJSON.stringify(Items.find().fetch());
    }
  });
}

// From Luis:
if (Meteor.isServer) {
  Items.remove({});
  Meteor.publish("pubA", function() {
    return Items.find({}, {
      fields: {
        'b.d': 1
      }
    });
  });
  Meteor.publish("pubB", function() {
    return Items.find({}, {
      fields: {
        'b.c': 1
      }
    });
  });
  if (Items.find().count() === 0) {
    Items.insert({
      'b': {
        c: "fieldBC",
        d: "fieldBD"
      }
    });
  }
}
