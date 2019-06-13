var subscribeRef, rootRef, subscribe;

var subscribe = {
  defaults: {
    rootRef: null,
    subscribeRef: null,
    rootRef: null,
    subscribes: null
  },
  onInit: function() {
    var vm = this;
    vm.defaults.rootRef = firebase.database().ref(); 
  },
  add: function(_fullname,_email,_newsletter1,_newsletter2) {
    var vm = this;
    var rootRef = firebase.database().ref(),
      path = 'subscribe/raw',
      subsc = rootRef.child(path);

    var newSubscKey = subsc.push().key;
    var updates = {};

    var subscribeData = {
      fullname: _fullname,
      email: _email,
      newsletter1: _newsletter1,
      newsletter2: _newsletter2,
      timestamp: vm.getDateTime()
    }; 
    updates['subscribe/raw/' + newSubscKey] = subscribeData; 
    rootRef.update(updates); 
  },
  getDateTime: function() {
    var d = new Date();
    return (
      ('00' + (d.getMonth() + 1)).slice(-2) +
      '/' +
      ('00' + d.getDate()).slice(-2) +
      '/' +
      d.getFullYear() +
      ' ' +
      ('00' + d.getHours()).slice(-2) +
      ':' +
      ('00' + d.getMinutes()).slice(-2) +
      ':' +
      ('00' + d.getSeconds()).slice(-2)
    );
  }
}

$(document).ready(function() {
  subscribe.onInit();
});