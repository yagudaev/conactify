
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

    function formatDate(d) {
        return (d.getMonth()+1) + '/' +
            d.getDate() + '/' +
            d.getFullYear();
    }

    function drawContacts(ctx) {
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect (10, 10, 55, 50);

        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect (30, 30, 55, 50);
    }

    // List view
    var visualizerHTML = '<canvas id="contact-visualizer" width="400" height="400"></canvas>';

    var list = $('.list').get(0);
    list.add({ title: 'Visualize',
               desc: 'Visualize contact ' + visualizerHTML,
               date: new Date(12, 9, 5) });
    list.add({ title: 'List',
               desc: 'Show all contacts',
               date: new Date(12, 10, 1) });

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
        $('.date', this).text(formatDate(item.get('date')));

        var el = document.getElementById('contact-visualizer');
        var context = el.getContext('2d');
        drawContacts(context);
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