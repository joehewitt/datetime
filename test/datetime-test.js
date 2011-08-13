var path = require('path'),
    assert = require('assert'),
    vows = require('vows');

require.paths.unshift(path.join(__dirname, '..', 'lib'));

var datetime = require('datetime');

// *************************************************************************************************

vows.describe('datetime basics').addBatch({
    'A time in PM': {
        topic: new Date('March 5, 2008 3:01:04 PM'),

        'with %a': function(topic) {
            assert.equal(datetime.format(topic, '%a'), 'Wed');
        },

        'with %A': function(topic) {
            assert.equal(datetime.format(topic, '%A'), 'Wednesday');
        },

        'with %b': function(topic) {
            assert.equal(datetime.format(topic, '%b'), 'Mar');
        },

        'with %B': function(topic) {
            assert.equal(datetime.format(topic, '%B'), 'March');
        },

        'with %c': function(topic) {
            assert.equal(datetime.format(topic, '%c'), 'Wed 05 Mar 2008 15:01:04 PST');
        },

        'with %C': function(topic) {
            assert.equal(datetime.format(topic, '%C'), '');
        },

        'with %d': function(topic) {
            assert.equal(datetime.format(topic, '%d'), '05');
        },

        'with %D': function(topic) {
            assert.equal(datetime.format(topic, '%D'), '03/05/08');
        },

        'with %e': function(topic) {
            assert.equal(datetime.format(topic, '%e'), ' 5');
        },

        'with %g': function(topic) {
            assert.equal(datetime.format(topic, '%g'), '');
        },

        'with %G': function(topic) {
            assert.equal(datetime.format(topic, '%G'), '');
        },

        'with %h': function(topic) {
            assert.equal(datetime.format(topic, '%h'), 'Mar');
        },

        'with %H': function(topic) {
            assert.equal(datetime.format(topic, '%H'), '15');
        },

        'with %I': function(topic) {
            assert.equal(datetime.format(topic, '%I'), '03');
        },

        'with %j': function(topic) {
            assert.equal(datetime.format(topic, '%j'), '');
        },

        'with %m': function(topic) {
            assert.equal(datetime.format(topic, '%m'), '03');
        },

        'with %M': function(topic) {
            assert.equal(datetime.format(topic, '%M'), '01');
        },

        'with %p': function(topic) {
            assert.equal(datetime.format(topic, '%p'), 'PM');
        },

        'with %P': function(topic) {
            assert.equal(datetime.format(topic, '%P'), 'pm');
        },

        'with %r': function(topic) {
            assert.equal(datetime.format(topic, '%r'), '03:01:04 PM');
        },

        'with %R': function(topic) {
            assert.equal(datetime.format(topic, '%R'), '15:01');
        },

        'with %S': function(topic) {
            assert.equal(datetime.format(topic, '%S'), '04');
        },

        'with %T': function(topic) {
            assert.equal(datetime.format(topic, '%T'), '15:01:04');
        },

        'with %u': function(topic) {
            assert.equal(datetime.format(topic, '%u'), '4');
        },

        'with %U': function(topic) {
            assert.equal(datetime.format(topic, '%U'), '');
        },

        'with %V': function(topic) {
            assert.equal(datetime.format(topic, '%V'), '');
        },

        'with %w': function(topic) {
            assert.equal(datetime.format(topic, '%w'), '3');
        },

        'with %W': function(topic) {
            assert.equal(datetime.format(topic, '%W'), '');
        },

        'with %x': function(topic) {
            assert.equal(datetime.format(topic, '%x'), '05/03/08');
        },

        'with %X': function(topic) {
            assert.equal(datetime.format(topic, '%X'), '15:01:04');
        },

        'with %y': function(topic) {
            assert.equal(datetime.format(topic, '%y'), '08');
        },

        'with %Y': function(topic) {
            assert.equal(datetime.format(topic, '%Y'), '2008');
        },

        'with %z': function(topic) {
            assert.equal(datetime.format(topic, '%z'), '-0800');
        },

        'with %Z': function(topic) {
            assert.equal(datetime.format(topic, '%Z'), 'PST');
        },

        'with %%': function(topic) {
            assert.equal(datetime.format(topic, '%%'), '%');
        },
    },

    'A time in AM': {
        topic: new Date('March 5, 2008 3:01:04 AM'),

        'with %H': function(topic) {
            assert.equal(datetime.format(topic, '%H'), '03');
        },

        'with %I': function(topic) {
            assert.equal(datetime.format(topic, '%I'), '03');
        },
    },

    'A time at midnight': {
        topic: new Date('March 3, 2008 12:01:04 AM'),

        'with %H': function(topic) {
            assert.equal(datetime.format(topic, '%H'), '00');
        },

        'with %I': function(topic) {
            assert.equal(datetime.format(topic, '%I'), '12');
        },
    },

    'A time at noon': {
        topic: new Date('March 3, 2008 12:01:04 PM'),

        'with %H': function(topic) {
            assert.equal(datetime.format(topic, '%H'), '12');
        },

        'with %I': function(topic) {
            assert.equal(datetime.format(topic, '%I'), '12');
        },
    },

    'A day on the first': {
        topic: new Date('March 1, 2008'),

        'with %k': function(topic) {
            assert.equal(datetime.format(topic, '%k'), 'st');
        },
    },

    'A day on the second': {
        topic: new Date('March 2, 2008'),

        'with %k': function(topic) {
            assert.equal(datetime.format(topic, '%k'), 'nd');
        },
    },

    'A day on the third': {
        topic: new Date('March 3, 2008'),

        'with %k': function(topic) {
            assert.equal(datetime.format(topic, '%k'), 'rd');
        },
    },

    'A day on the fourth': {
        topic: new Date('March 4, 2008'),

        'with %k': function(topic) {
            assert.equal(datetime.format(topic, '%k'), 'th');
        },
    },

    'A day on the fifth': {
        topic: new Date('March 5, 2008'),

        'with %k': function(topic) {
            assert.equal(datetime.format(topic, '%k'), 'th');
        },
    },

    'A time': {
        topic: new Date('March 5, 2008'),

        'formatted with hyphens': function(topic) {
            assert.equal(datetime.format(topic, '%Y-%m-%d'), '2008-03-05');
        },
    },

    'A time': {
        topic: new Date('March 5, 2008 3:30 pm'),

        'at singular seconds ago': function(topic) {
            var base = new Date('March 5, 2008 3:30:01 pm');
            assert.equal(datetime.formatAgo(topic, null, base), 'a second ago');
        },

        'at plural seconds ago': function(topic) {
            var base = new Date('March 5, 2008 3:30:15 pm');
            assert.equal(datetime.formatAgo(topic, null, base), '15 seconds ago');
        },

        'at singular minutes ago': function(topic) {
            var base = new Date('March 5, 2008 3:31 pm');
            assert.equal(datetime.formatAgo(topic, null, base), 'a minute ago');
        },

        'at plural minutes ago': function(topic) {
            var base = new Date('March 5, 2008 3:45 pm');
            assert.equal(datetime.formatAgo(topic, null, base), '15 minutes ago');
        },

        'at singular hours ago': function(topic) {
            var base = new Date('March 5, 2008 4:45 pm');
            assert.equal(datetime.formatAgo(topic, null, base), 'an hour ago');
        },

        'at plural hours ago': function(topic) {
            var base = new Date('March 5, 2008 5:45 pm');
            assert.equal(datetime.formatAgo(topic, null, base), '2 hours ago');
        },

        'at a day ago': function(topic) {
            var base = new Date('March 6, 2008 5:45 pm');
            assert.equal(datetime.formatAgo(topic, null, base), 'Wednesday at 3:30pm');
        },

        'at a week ago': function(topic) {
            var base = new Date('March 13, 2008 5:45 pm');
            assert.equal(datetime.formatAgo(topic, null, base), 'March 5th at 3:30pm');
        },

        'at a year ago': function(topic) {
            var base = new Date('March 13, 2009 5:45 pm');
            assert.equal(datetime.formatAgo(topic, null, base), 'March 5th, 2008 at 3:30pm');
        },
    },

    'A time': {
        topic: new Date('March 5, 2008 3:30 pm'),

        'in singular seconds': function(topic) {
            var base = new Date('March 5, 2008 3:30:01 pm');
            assert.equal(datetime.formatAgo(base, null, topic), 'in a second');
        },

        'in plural seconds': function(topic) {
            var base = new Date('March 5, 2008 3:30:15 pm');
            assert.equal(datetime.formatAgo(base, null, topic), 'in 15 seconds');
        },

        'in singular minutes': function(topic) {
            var base = new Date('March 5, 2008 3:31 pm');
            assert.equal(datetime.formatAgo(base, null, topic), 'in a minute');
        },

        'in plural minutes': function(topic) {
            var base = new Date('March 5, 2008 3:45 pm');
            assert.equal(datetime.formatAgo(base, null, topic), 'in 15 minutes');
        },

        'in singular hours': function(topic) {
            var base = new Date('March 5, 2008 4:45 pm');
            assert.equal(datetime.formatAgo(base, null, topic), 'in an hour');
        },

        'in plural hours': function(topic) {
            var base = new Date('March 5, 2008 5:45 pm');
            assert.equal(datetime.formatAgo(base, null, topic), 'in 2 hours');
        },

        'in a day': function(topic) {
            var base = new Date('March 6, 2008 5:45 pm');
            assert.equal(datetime.formatAgo(base, null, topic), 'Thursday at 5:45pm');
        },

        'in a week': function(topic) {
            var base = new Date('March 13, 2008 5:45 pm');
            assert.equal(datetime.formatAgo(base, null, topic), 'March 13th at 5:45pm');
        },

        'in a year': function(topic) {
            var base = new Date('March 13, 2009 5:45 pm');
            assert.equal(datetime.formatAgo(base, null, topic), 'March 13th, 2009 at 5:45pm');
        },
    },
}).export(module);
