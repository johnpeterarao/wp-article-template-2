var pollsRef, rootRef, polls, poll1, poll2; 
var polls = {
  defaults: {
    rootRef: null,
    pollsRef: null,
    rootRef: null,
    polls: null,
    poll1: null,
    poll2: null
  },
  onInit: function() {
    var vm = this;
    vm.defaults.rootRef = firebase.database().ref();
    vm.getAll();
  },

  getAll: function() {
    var vm = this;
    var rootRef = vm.defaults.rootRef;
    rootRef.on('value', function(snapshot) {
      var pollRef1 = snapshot.child('polls/poll1/tallied');
      var pollRef2 = snapshot.child('polls/poll2/tallied');
      vm.defaults.poll1 = pollRef1.val();
      vm.defaults.poll2 = pollRef2.val(); 
      
      // 1-time voting cookie
      if (typeof Cookies.get('_poll1') != 'undefined') {
        // console.log('Already voted poll 1');
        vm.onComplete('poll1');
      }
      if (typeof Cookies.get('_poll2') != 'undefined') {
        // console.log('Already voted poll 2');
        vm.onComplete('poll2');
      }
      
    });
  },

  get: function(id) {
    // console.log(id);
    var vm = this;
    var rootRef = vm.defaults.rootRef;
    rootRef.on('value', function(snapshot) {
      var pollsRef = snapshot.child('polls/' + id);
      var poll = pollsRef.val();
    });
  },

  add: function(id, title) {
    var vm = this;
    var rootRef = firebase.database().ref(),
      path = 'polls/' + id + '/raw',
      poll = rootRef.child(path);

    var newPollKey = poll.push().key;
    var updates = {};

    var pollData = {
      answer: title,
      timestamp: vm.getDateTime()
    };

    var newTitle = String(title)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[^\w\s]/g, '');
    var counter = vm.defaults[id][newTitle].count + 1;
    vm.defaults[id][newTitle].count = counter;
    // console.log(newTitle);
    updates['polls/' + id + '/raw/' + newPollKey] = pollData;
    updates['polls/' + id + '/tallied/' + newTitle + '/count'] = counter;
    updates[
      'polls/' + id + '/tallied/' + newTitle + '/timestamp'
    ] = vm.getDateTime();

    rootRef.update(updates, vm.onComplete(id, pollData));

    // console.log(vm.getDateTime());
  },

  update: function(id) {},

  onComplete: function(id) {
    var vm = this;
    var pollID = id === 'poll1' ? 'poll-1' : 'poll-2';
    // console.log(id);
    if (id === 'poll1') {
      Cookies.set('_poll1', '1');
      // console.log(vm.defaults.poll1);
      var result = {
        p1: String(vm.defaults.poll1.programmeranking.count),
        p2: String(vm.defaults.poll1.location.count),
        p3: String(vm.defaults.poll1.costs.count),
        p4: String(vm.defaults.poll1.curriculum.count),
        p5: String(vm.defaults.poll1.schedule.count),
        total: String(
          vm.defaults.poll1.programmeranking.count +
            vm.defaults.poll1.location.count +
            vm.defaults.poll1.costs.count +
            vm.defaults.poll1.curriculum.count +
            vm.defaults.poll1.schedule.count
        )
      };
      // console.log('result', result);
      $('#poll-1-1 .poll-bar').each(function(k, i) {
        var percentage = (result['p' + (k + 1)] /
          result['total'] *
          100).toFixed(2);
        $(this).attr('data-barwidth', percentage);
        $('#poll-1-1 .poll-result:eq(' + k + ')')
          .attr('data-entrypercent', percentage)
          .html(percentage + '%');
      });
      
      $('#poll-1 .entry-post').addClass('voted');
      $('#poll-1 .entry-title').addClass('voted');
      $('#poll-1 input[type=radio]').addClass('fade-hide');
      $('#poll-1 .pseudo-radio').addClass('fade-hide');
      $('#poll-1 .radio-btn').addClass('radio-hide');
      $('#poll-1 .radio-wrapper').addClass('radio-hide');
      TweenMax.to($('#poll-1 .poll-submit-wrap'), 0.5, {
        opacity: 0,
        ease: Expo.easeInOut,
        onComplete: function() {
          $('#poll-1 .poll-submit-wrap input').css('pointer-events', 'none');
        }
      });
      $('#poll-1 .entry-post .entry-title > p').addClass('no-padding');
      $('#poll-1 input[type=radio][name=eMBA-poll]').each(function() {
        // var poll_bars = $(this).siblings('.poll-bar').attr('data-barwidth');
        var poll_key = $(this).attr('data-key');
        var poll_bar = $('.select-trigger[data-key="'+poll_key+'"]').find('.poll-bar');
        var poll_bars = poll_bar.attr('data-barwidth');
        TweenMax.to(poll_bar, 2, {
          width: poll_bars + '%',
          ease: Expo.easeOut
        });
      });
      $('#poll-1 .poll-result').each(function() {
        var poll_results = $(this).attr('data-entrypercent');
        $(this).addClass('view-result');
        $(this).html(poll_results + '%');
      });
    } else {
      Cookies.set('_poll2', '1');
      var result = {
        p1: String(vm.defaults.poll2.fullsupport.count),
        p2: String(vm.defaults.poll2.partialsupport.count),
        p3: String(vm.defaults.poll2.itisavailableforsome.count),
        p4: String(vm.defaults.poll2.nosupport.count),
        total: String(
          vm.defaults.poll2.fullsupport.count +
            vm.defaults.poll2.partialsupport.count +
            vm.defaults.poll2.itisavailableforsome.count +
            vm.defaults.poll2.nosupport.count
        )
      };
      // console.log(vm.defaults.poll2);
      // console.log(result);

      $('#poll-2-1 .poll-bar').each(function(k, i) {
        var percentage = (result['p' + (k + 1)] /
          result['total'] *
          100).toFixed(2);
        $(this).attr('data-barwidth', percentage);
        $('#poll-2-1 .poll-result:eq(' + k + ')')
          .attr('data-entrypercent', percentage)
          .html(percentage + '%');
      });

      $('#poll-2 .entry-post').addClass('voted');
      $('#poll-2 .entry-title').addClass('voted');
      $('#poll-2 input[type=radio]').addClass('fade-hide');
      $('#poll-2 .pseudo-radio').addClass('fade-hide');
      $('#poll-2 .radio-btn').addClass('radio-hide');
      $('#poll-2 .radio-wrapper').addClass('radio-hide');
      $('#poll-2 .entry-post .entry-title > p').addClass('no-padding');
      TweenMax.to($('#poll-2 .poll-submit-wrap'), 0.5, {
        opacity: 0,
        ease: Expo.easeInOut,
        onComplete: function() {
          $('#poll-2 .poll-submit-wrap input').css('pointer-events', 'none');
        }
      });
      $('#poll-2 input[type=radio][name=eMBA-poll-2]').each(function() {
        var poll_key = $(this).attr('data-key');
        var poll_bar = $('.select-trigger[data-key="'+poll_key+'"]').find('.poll-bar');
        var poll_bars = poll_bar.attr('data-barwidth');
        TweenMax.to(poll_bar, 2, {
          width: poll_bars + '%',
          ease: Expo.easeOut
        });
        // var poll_bars = $(this).siblings('.poll-bar').attr('data-barwidth');
        // TweenMax.to($(this).siblings('.poll-bar'), 2, {
        //   width: poll_bars + '%',
        //   ease: Expo.easeOut
        // });
      });
      $('#poll-2 .poll-result').each(function() {
        var poll_results = $(this).attr('data-entrypercent');
        $(this).addClass('view-result');
        $(this).html(poll_results + '%');
      });
    }
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
};
$(document).ready(function() {
  polls.onInit();
});
