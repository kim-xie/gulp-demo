1��gulp ����
-------------------------------------------------------
1.1��ȫ�ְ�װ������node��������
	$ npm install --global gulp

1.2����Ϊ��Ŀ����������devDependencies����װ��
	$ npm install --save-dev gulp

1.3������Ŀ��Ŀ¼�´���һ����Ϊ gulpfile.js ���ļ���
	var gulp = require('gulp');

	gulp.task('default', function() {
		// �����Ĭ�ϵ�������������
	});

1.4������gulp:
	$ gulp

Ĭ�ϻ�ִ��default��������������û���κ�������룬����������ѧϰgulp��api��

2��gulp api
-------------------------------------------------------
2.1��gulp.src([globs],options)
globs:
���ͣ� String �� Array

options:
���ͣ� Object
{
	buffer: 
		���ͣ� Boolean Ĭ��ֵ�� true
		����������Ϊ false����ô������ stream ��ʽ���� file.contents �������ļ� buffer ����ʽ�����ڴ���һЩ���ļ���ʱ�򽫻������
	
	read: 
		���ͣ� Boolean Ĭ��ֵ�� true
		����������Ϊ false�� ��ô file.contents �᷵�ؿ�ֵ��null����Ҳ���ǲ�����ȥ��ȡ�ļ�
	
	base:
		���ͣ� String Ĭ��ֵ�� ������� glob ֮ǰ
	
}

2.2��gulp.dest([path], options)
path:
	���ͣ� String or Function
	�ļ�����д���·�������Ŀ¼��

options:
���ͣ� Object
{
	cwd: 
		���ͣ� String Ĭ��ֵ�� process.cwd()
		���Ŀ¼�� cwd ������ֻ�����������Ŀ¼�����·��ʱ����Ч
	
	mode: 
		���ͣ� String Ĭ��ֵ�� 0777
		�˽���Ȩ���ַ������Զ������������Ŀ¼����������Ŀ¼��Ȩ��
	
}

2.3��gulp.task(name, [deps], fn)
name: 
	��������֣��������Ҫ�����������������ĳЩ������ô���벻Ҫ��������ʹ�ÿո�

deps:
	���ͣ� Array
	һ�����������б�����飬��Щ��������㵱ǰ��������֮ǰ���
	gulp.task('mytask', ['array', 'of', 'task', 'names'], function() {
	  // ��һЩ��
	});

fn:
	�ú�������������Ҫִ�е�һЩ����

2.4��
gulp.watch(glob [, opts], tasks) �� gulp.watch(glob [, opts, cb])
�����ļ������ҿ������ļ������Ķ�ʱ����һЩ����

glob��
	���ͣ� String or Array
	һ�� glob �ַ���������һ��������� glob �ַ��������飬����ָ����������Щ�ļ��ı䶯

opts��
	���ͣ� Object

tasks��
	���ͣ� Array
	��Ҫ���ļ��䶯��ִ�е�һ�����߶��ͨ�� gulp.task() ������ task ������

cb(event)��
	���ͣ� Function
	ÿ�α䶯��Ҫִ�е� callback

event.type
	���ͣ� String
	�����ı䶯�����ͣ�added, changed ���� deleted