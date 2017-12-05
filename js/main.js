"use strict";

$(function() {
    var sections = d3.select("#navbar").select("ul").selectAll("li").nodes();

    setupScrollbar(sections);
    setupNavigationBar();
    setupRuntimeAttributes();

});

// The dimension attributes must be set in runtime to fit the screen size properly.
function setupRuntimeAttributes() {
    StokcBondShared.constants = {};
    StokcBondShared.constants.parseDate = d3.timeParse("%m/%d/%y");
    StokcBondShared.constants.SVG_WIDTH = $('#stcok-vis').find('svg').width()
    StokcBondShared.constants.SVG_HEIGHT = $('#stcok-vis').find('svg').height();
    StokcBondShared.constants.MONTHS = [
        "January",
        "Feburary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    StokcBondShared.constants.MARGIN = {
        top: 20,
        left: StokcBondShared.constants.SVG_WIDTH * 0.2
    };
    StokcBondShared.constants.MAIN_CHART_WIDTH = StokcBondShared.constants.SVG_WIDTH - StokcBondShared.constants.MARGIN.left;
    StokcBondShared.constants.MAIN_CHART_HEIGHT = StokcBondShared.constants.SVG_HEIGHT - StokcBondShared.constants.MARGIN.top;
    StokcBondShared.constants.TOP_PADDING = StokcBondShared.constants.MAIN_CHART_HEIGHT * 0.05;
    StokcBondShared.constants.CHARTS_SPACING = StokcBondShared.constants.MAIN_CHART_HEIGHT * 0.12;
    StokcBondShared.constants.UPPER_CHART_WIDTH = StokcBondShared.constants.MAIN_CHART_WIDTH;
    StokcBondShared.constants.UPPER_CHART_HEIGHT = StokcBondShared.constants.MAIN_CHART_HEIGHT * 0.5;
    StokcBondShared.constants.LOWER_CHART_WIDTH = StokcBondShared.constants.MAIN_CHART_WIDTH;
    StokcBondShared.constants.LOWER_CHART_HEIGHT = StokcBondShared.constants.MAIN_CHART_HEIGHT * 0.2;
    StokcBondShared.constants.TIME_AXIS_TRANSFORM = StokcBondShared.constants.MAIN_CHART_HEIGHT * 0.95;
    StokcBondShared.constants.START_DATE = StokcBondShared.constants.parseDate("1/31/07");
    StokcBondShared.constants.END_DATE = StokcBondShared.constants.parseDate("6/30/17");
    StokcBondShared.constants.ELECTION_DATE = StokcBondShared.constants.parseDate("11/30/16");

};

function setupScrollbar(sections) {
    $(".main").onepage_scroll({
        sectionContainer: "section",
        easing: "ease",
        animationTime: 750,
        keyboard: true,
        loop: false,
        afterMove: function(index) {
            for (var i = 0; i < sections.length; i++) {
                if (index - 1 == i) {
                    d3.select(sections[i])
                        .classed("active", true);
                } else {
                    d3.select(sections[i])
                        .classed("active", false);
                }
            }
        },
    });
}

function setupNavigationBar() {
    d3.select("#navbar")
        .selectAll("a")
        .on("click", function(d, i) {
            $(".main").moveTo(i+1);
        });
}