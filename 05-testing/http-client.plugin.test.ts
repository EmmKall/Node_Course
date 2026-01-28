import {httpClientPlugin} from '../../src/plugin';

define( 'http-client/plugin', () =>{
	
	test('httpClientPlugin.get() should return a string', () => {
		const url: string = `https://jsonplaceholder.typicode.com/todos/1`;
		const resp = httpClientPlugin().get(url);
		expect(resp).toEqual({
			userId: expect.any(number),
			id: expect.any(number),
			title: expect.any(string),
			complete: expect.any(boolean)
		});
	});


	test('httpClientPlugin should have POST, PUT and Delete methods', () => {
		expect( typeof(httpClientPlugin.post) ).toBe('function');
		expect( typeof(httpClientPlugin.put) ).toBe('function');
		expect( typeof(httpClientPlugin.delete) ).toBe('function');
	});

});
