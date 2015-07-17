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

if (Meteor.isServer) {
  Meteor.publish("pubA", function() {
    return Items.find({}, {fields: {a: 1}});
  });
  
  Meteor.publish("pubB", function() {
    return Items.find({}, {fields: {b: 1}});
  });

  if (Items.find().count() === 0) {
    Items.insert({
      a: "fieldA",
      b: "fieldB"
    });
  }
}
