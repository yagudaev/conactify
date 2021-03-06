
// This uses require.js to structure javascript:
// http://requirejs.org/docs/api.html#define

define(function(require) {
    // Receipt verification (https://github.com/mozilla/receiptverifier)
    require('receiptverifier');

    // Installation button
    require('./install-button');

    // Write your app here.

    require('layouts/view');
    require('layouts/list');

    var visualizationView = require('./views/visualization-view');
    var listView = require('./views/list-view');

    function formatDate(d) {
        return (d.getMonth()+1) + '/' +
            d.getDate() + '/' +
            d.getFullYear();
    }

    // List view
    var list = $('.list').get(0);
    list.add({ title: 'Visualize',
               desc: '<div id="visualization"></div>'
             });
    list.add({ title: 'List',
               desc: '<div id="contacts-list"></div>'
             });

    $('button.refresh', list).click(function() {
        // Do nothing right now
    });

    $('button.add', list).click(function() {
        edit.open(null, 'slideLeft');
    });

    // Detail view

    var detail = $('.detail').get(0);
    detail.render = function(item) {
        $('.title', this).html(item.get('title'));
        $('.desc', this).html(item.get('desc'));

        var el;

        switch(item.get('title')) {
            case "List":
                el = document.getElementById("contacts-list");
                listView.render(el);
                break;
            case "Visualize":
                el = document.getElementById("visualization");
                visualizationView.render(el);
        }
    };

    // Edit view

    var edit = $('.edit').get(0);
    edit.render = function(item) {
        item = item || { id: '', get: function() { return ''; } };

        $('input[name=id]', this).val(item.id);
        $('input[name=title]', this).val(item.get('title'));
        $('input[name=desc]', this).val(item.get('desc'));
    };

    edit.getTitle = function() {
        var model = this.view.model;

        if(model) {
            return model.get('title');
        }
        else {
            return 'New';
        }
    };

    $('button.add', edit).click(function() {
        var el = $(edit);
        var title = el.find('input[name=title]');
        var desc = el.find('input[name=desc]');
        var model = edit.model;

        if(model) {
            model.set({ title: title.val(), desc: desc.val() });
        }
        else {
            list.add({ title: title.val(),
                       desc: desc.val(),
                       date: new Date() });
        }

        edit.close('slideRightOut');
    });
});