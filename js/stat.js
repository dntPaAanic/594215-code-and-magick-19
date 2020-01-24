'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var SHADOW_COORDINATE = 10;
var CLOUD_COLOR = 'rgba(255, 255, 255, 1)';
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var HISTOGRAM_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var USER_BAR_COLOR = 'rgba(255, 0, 0, 1)';
var INDENT_X = 150;
var INDENT_Y = 90;
var LINE_HEIGHT = 15;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  var getRandomColor = function (minValue, maxValue) {
    ctx.fillStyle = 'blue';
    ctx.globalAlpha = Math.random() * (maxValue - minValue) + minValue;
  };

  var barStep = HISTOGRAM_HEIGHT / getMaxElement(times);

  var drawColumn = function (index) {
    ctx.fillRect(INDENT_X + (BAR_WIDTH + BAR_GAP) * index, INDENT_Y + 5 + (HISTOGRAM_HEIGHT - times[index] * barStep), BAR_WIDTH, times[index] * barStep);
  };

  var fillText = function (text, coordX, coordY) {
    ctx.fillText(text, coordX, coordY);
  };

  renderCloud(ctx, CLOUD_X + SHADOW_COORDINATE, CLOUD_Y + SHADOW_COORDINATE, CLOUD_SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);
  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  fillText('Ура вы победили!', INDENT_X, 40);
  fillText('Список результатов: ', INDENT_X, 60);

  for (var i = 0; i < times.length; i++) {
    fillText(Math.round(times[i]), INDENT_X + (BAR_WIDTH + BAR_GAP) * i, INDENT_Y + (HISTOGRAM_HEIGHT - times[i] * barStep));
    if (names[i] === 'Вы') {
      ctx.fillStyle = USER_BAR_COLOR;
    } else {
      getRandomColor(0.2, 1);
    }
    drawColumn(i);
    ctx.fillStyle = '#000000';
    ctx.globalAlpha = 1;
    fillText(names[i], INDENT_X + (BAR_WIDTH + BAR_GAP) * i, INDENT_Y + HISTOGRAM_HEIGHT + LINE_HEIGHT + 10);
  }
};
