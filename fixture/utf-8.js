/**
 * 此文件描述一个spec的通常结构
 *
 * 1. spec所在目录名和应用目录名相对应
 *    如旺铺的主应用目录为： js/main
 *    则对应的spec目录应该为： js/main-test(或js/main-spec)
 * 
 * 2. spec和待测试的js文件一一对应
 *    如需要测试一个组件: js/main/module/widget/switchable.js
 *    则有一个spec与之对应: js/main-spec/module/widget/switchable-spec.js(或switchable-test.js)
 *
 * 以下示例描述常见spec的书写方式
 */

describe('widget.Switchable 切换组件', function() {

  describe('Base, 切换组件基础', function() {
    
    it('调用switchTo方法，则切换到指定页', function() {
      expect(1 + 1).toEqual(2); 
    });
    
  });


  describe('自动轮播组件播放类型', function() {
    it('default类型，则顺序播放', function() {
      expect(1 + 1).toEqual(2); 
    }); 

    it('random类型，则随机播放', function() {  
      expect(1 + 1).toEqual(2); 
    })
  });


  describe('切换组件效果库', function() {
    it('默认仅使用jQuery show/hide来显示或隐藏', function() {
      expect(1 + 1).toEqual(2); 
    });
  });


  it('简单使用', function() {
      expect(1 + 1).toEqual(2); 
  });
  
});
