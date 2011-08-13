
var locales = {
    'en-US': {
        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        dayNamesAbbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August",
                     "September", "October", "November", "December"],
        monthNamesAbbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
                                "Aug", "Sep", "Oct", "Nov", "Dec"],

        ampm: {'AM': 'AM', 'PM': 'PM'},

        daySuffixes: {1: 'st', 2: 'nd', 3: 'rd', 4: 'th'},
        
        dateTimeFormat: '%a %d %b %Y %T %Z',
        dateFormat: '%d/%m/%y',
        timeFormat: '%T',
        
        secondAgo: 'a second ago',
        secondsAgo: '%t seconds ago',
        minuteAgo: 'a minute ago',
        minutesAgo: '%t minutes ago',
        hourAgo: 'an hour ago',
        hoursAgo: '%t hours ago',
        dayAgo: 'a day ago',
        daysAgo: '%t days ago',
        dayAgo: 'a day ago',
        daysAgo: '%t days ago',

        secondIn: 'in a second',
        secondsIn: 'in %t seconds',
        minuteIn: 'in a minute',
        minutesIn: 'in %t minutes',
        hourIn: 'in an hour',
        hoursIn: 'in %t hours',
        dayIn: 'in a day',
        daysIn: 'in %t days',
    }
};


function getLocale(locale) {
    return locales[locale] || locales['en-US'];
}

// *************************************************************************************************

var formatRegex = /%([a-zA-Z%])/g;

var formatters = {
    'a': function(d, locale) {
        return locale.dayNamesAbbreviated[d.getDay()];
    },
    'A': function(d, locale) {
        return locale.dayNames[d.getDay()];
    },
    'b': function(d, locale) {
        return locale.monthNamesAbbreviated[d.getMonth()];
    },
    'B': function(d, locale) {
        return locale.monthNames[d.getMonth()];
    },
    'c': function(d, locale, t, l) {
        return exports.format(d, locale.dateTimeFormat, t, l);
    },
    'C': function(d, locale, t, l) {
        return ''; // XXXjoe Century number
    },
    'd': function(d, locale) {
        return leadingZero(d.getDate());
    },
    'D': function(d, locale, t, l) {
        return exports.format(d, '%m/%d/%y', t, l);
    },
    'e': function(d, locale) {
        return leadingZero(d.getDate(), ' ');
    },
    'g': function(d, locale) {
        return ''; // XXXjoe year, different standard
    },
    'G': function(d, locale) {
        return ''; // XXXjoe year, different standard
    },
    'h': function(d, locale) {
        return this.b.apply(this, arguments);
    },
    'H': function(d, locale) {
        return leadingZero(d.getHours());
    },
    'I': function(d, locale) {
        var h = d.getHours();
        var H = h == 0 || h == 12 ? 12 : h % 12;
        return leadingZero(H);
    },
    'j': function(d, locale) {
        return ''; // XXXjoe Day of the year (001 - 366)
    },
    'm': function(d, locale) {
        return leadingZero(d.getMonth()+1);
    },
    'M': function(d, locale) {
        return leadingZero(d.getMinutes());
    },
    'p': function(d, locale) {
        return d.getHours() < 12 ? locale.ampm['AM'] : locale.ampm['PM'];
    },
    'P': function(d, locale) {
        return this.p.apply(this, arguments).toLowerCase();
    },
    'r': function(d, locale, t, l) {
        return exports.format(d, '%I:%M:%S %p', t, l);
    },
    'R': function(d, locale, t, l) {
        return exports.format(d, '%H:%M', t, l);
    },
    'S': function(d, locale) {
        return leadingZero(d.getSeconds());
    },
    'T': function(d, locale, t, l) {
        return exports.format(d, '%H:%M:%S', t, l);
    },
    'u': function(d, locale) {
        return d.getDay()+1;
    },
    'U': function(d, locale) {
        return ''; // XXXjoe Week number of year
    },
    'V': function(d, locale) {
        return ''; // XXXjoe Week number of year, different standard
    },
    'w': function(d, locale) {
        return d.getDay();
    },
    'W': function(d, locale) {
        return ''; // XXXjoe Week number of year, different standard
    },
    'x': function(d, locale, t, l) {
        return exports.format(d, locale.dateFormat, t, l);
    },
    'X': function(d, locale, t, l) {
        return exports.format(d, locale.timeFormat, t, l);
    },
    'y': function(d, locale) {
        return leadingZero(d.getYear() - 100);
    },
    'Y': function(d, locale) {
        return d.getFullYear();
    },
    'z': function(d, locale) {
        var offset = d.getTimezoneOffset();
        var hour = leadingZero(Math.round(Math.abs(offset / 60)));
        var min = leadingZero(offset % 60);
        return (offset > 0 ? '-' : '+') + hour + min;
    },
    'Z': function(d, locale) {
        return d.toString().replace(/^.*\(([^)]+)\)$/, '$1');
    },
    '%': function(d, locale) {
        return '%';
    },
    
    // NON-STANDARD ADDITIONS
    'i': function(d, locale) {
        var h = d.getHours();
        return h == 0 || h == 12 ? 12 : h % 12;
    },

    'k': function(d, locale) {
        var date = d.getDate();
        var modDay = date >= 20 ? date % 10 : date;
        if (modDay in locale.daySuffixes) {
            return locale.daySuffixes[modDay];
        } else {
            return locale.daySuffixes[4];
        }
    }
};

function leadingZero(n, leading) {
    return n >= 10 ? n : (leading ? leading : '0')+n;
}   

// *************************************************************************************************

var second = exports.second = 1000;
var minute = exports.minute = second*60;
var hour = exports.hour = minute*60;
var day = exports.day = hour*24;
var week = exports.week = day*7;

// *************************************************************************************************

exports.format = function(d, format, timezone, locale) {
    var localeData = getLocale(locale);
    var parts = [];
    var m;
    while (m = formatRegex.exec(format)) {
        var part = m[1];
        var formatter = formatters[part];
        if (formatter) {
            format = format.replace(m[0], formatter.apply(formatters, [d, localeData, timezone, locale]));
        }
    }
    return format;
        
    // for (var i = 0; i < separated.length; ++i) {
    //     var part = separated[i];
    //     if (part) {
    //         var formatter = formatters[part];
    //         if (formatter) {
    //             parts.push(formatter.apply(formatters, [d, localeData, timezone, locale]));
    //         } else {
    //             parts.push(part);
    //         }
    //     }
    // }
    // return parts.join('');
};

exports.formatAgo = function(d, timezone, baseTime, locale) {
    var l = getLocale(locale);
    if (!baseTime) {
        baseTime = new Date();
    }

    var ad = baseTime - d;
    var delta = Math.abs(ad);
    if (delta < minute) {
        var n = Math.round(delta/second);
        var format = n == 1 ? (ad > 0 ? l.secondAgo : l.secondIn) : (ad > 0 ? l.secondsAgo : l.secondsIn);
        return format.replace('%t', n);
    } else if (delta < hour) {
        var n = Math.round(delta/minute);
        var format = n == 1 ? (ad > 0 ? l.minuteAgo : l.minuteIn) : (ad > 0 ? l.minutesAgo : l.minutesIn);
        return format.replace('%t', n);
    } else if (delta < day) {
        var n = Math.round(delta/hour);
        var format = n == 1 ? (ad > 0 ? l.hourAgo : l.hourIn) : (ad > 0 ? l.hoursAgo : l.hoursIn);
        return format.replace('%t', n);
    } else if (delta < week) {
        return exports.format(d, '%A at %i:%M%P', timezone, locale);
    } else if (d.getYear() == baseTime.getYear()) {
        return exports.format(d, '%B %e%k at %i:%M%P', timezone, locale);
    } else {
        return exports.format(d, '%B %e%k, %Y at %i:%M%P', timezone, locale);
    }
};
