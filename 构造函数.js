// 发布订阅者模式
var EventList = function () {
  this._context = null;
  this._eventObj = {};
  // 添加监听事件
  this.addListen = function (eventPerson, eventName, eventFn) {
    if (this._eventObj[eventName]) {
      if (!this._eventObj[eventName][eventPerson]) {
        this._eventObj[eventName][eventPerson] = [eventFn];
        return;
      }
      this._eventObj[eventName][eventPerson].push(eventFn);
    } else {
      this._eventObj[eventName] = {};
      this._eventObj[eventName][eventPerson] = [eventFn]
    }
  }
  // 发布监听
  this.subscribe = function (eventName, data) {
    if (!this._eventObj[eventName]) {
      console.log(eventName + "并无此事件的监听");
      return;
    }
    var eventList = this._eventObj[eventName];
    for (var value in eventList) {
      var fnList = eventList[value];
      var len = fnList.length;
      for (var i = 0; i < len; i++) {
        var fn = fnList[i];
        if (!this._context) {
          fn(data);
        } else {
          fn.call(this._context, data)
        };
      }
    }
    return;
  }
  // 删除监听
  this.delListen = function (eventPerson, eventName) {
    if (this._eventObj[eventName]) {
      if (this._eventObj[eventName][eventPerson]) {
        delete this._eventObj[eventName][eventPerson];
      } else {
        return;
      }
    } else {
      return;
    }
  }
}

var add = new EventList();

obj = {
  numder: 100,
}

add._context = obj;

add.addListen("zhangsan", "getNumber", function (num) {
  console.log('zhangsan1', num);
  console.log(this.numder);
})

add.addListen("zhangsan", "getNumber", function (num) {
  console.log('zhangsan2', num);
  console.log(this.numder);
})

add.addListen("lisi", "getNumber", function (num) {
  console.log('lisi', ++num);
  console.log(this.numder);
})

add.delListen('lisi', 'getNumber');

console.log(add._eventObj);


add.subscribe("getNumber", 1);
// setInterval(function () {
// }, 500);

console.log(add._eventObj);