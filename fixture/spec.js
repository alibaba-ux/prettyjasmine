/**
 * ���ļ�����һ��spec��ͨ���ṹ
 *
 * 1. spec����Ŀ¼����Ӧ��Ŀ¼�����Ӧ
 *    �����̵���Ӧ��Ŀ¼Ϊ�� js/main
 *    ���Ӧ��specĿ¼Ӧ��Ϊ�� js/main-test(��js/main-spec)
 * 
 * 2. spec�ʹ����Ե�js�ļ�һһ��Ӧ
 *    ����Ҫ����һ�����: js/main/module/widget/switchable.js
 *    ����һ��spec��֮��Ӧ: js/main-spec/module/widget/switchable-spec.js(��switchable-test.js)
 *
 * ����ʾ����������spec����д��ʽ
 */

describe('widget.Switchable �л����', function() {

  describe('Base, �л��������', function() {
    
    it('����switchTo���������л���ָ��ҳ', function() {
      expect(1 + 1).toEqual(2); 
    });
    
  });


  describe('�Զ��ֲ������������', function() {
    it('default���ͣ���˳�򲥷�', function() {
      expect(1 + 1).toEqual(2); 
    }); 

    it('random���ͣ����������', function() {  
      expect(1 + 1).toEqual(2); 
    })
  });


  describe('�л����Ч����', function() {
    it('Ĭ�Ͻ�ʹ��jQuery show/hide����ʾ������', function() {
      expect(1 + 1).toEqual(2); 
    });
  });


  it('��ʹ��', function() {
      expect(1 + 1).toEqual(2); 
  });
  
});
