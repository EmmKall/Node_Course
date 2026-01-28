import { getUUID } from '../../src/plugins';

describre('plugin/get-id.plugin.ts', ()=>{

	test('getUUID() return UUID' () => {
		const uuid = getUUID();
		expect(uuid.length).toBe(36);
	});

});
