import {buildLogger, logger as winstonLogger} from '';

describe( 'logger/plugins', () => {

	test( 'buildLogger() should return a function logger', () => {
		const logger = buildLogger('test');

		expect(typeof logger.log).toBe('function');
		expect(typeof logger.error).toBe('function');
	});

	test('logger.log should log a message', () => {
		const winstonLoggerMock = jest.spyOn();
		const message: string = 'test message';
		const service: string = 'test service'; 

		const logger = buildLogger(service);

		logger.log(message);
		expect(winstonLoggerMock).toBeHaveBeenCallWith({
			'info',
			expect.objectContaining({ level: 'info', message, service })
		});

	});

});

