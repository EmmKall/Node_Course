import { emailTemplate } from '../../src/js-foundation/01-template';

describe('01-template', () => {

    test('emailTemplate should contain a greeting', () => {
        expect(emailTemplate).toContain('Hi,');
    });

    test('emailtemplate should contain {{name}} and {{orderid}}', () => {
        expect(emailTemplate).toMatch(/{{name}}/); //expect(emailTemplate).toContain('{{name}}');
        expect(emailTemplate).toMatch(/{{orderId}}/); //expect(emailTemplate).toContain('{{orderId}}');
    });

    
});
