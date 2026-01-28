describe('App', () => {
    test('should be true', () => { //it('should be true', () => {
        expect(true).toBe(true)
    })
    
    test('should be 30', () => { //it('should be true', () => {
        //1 Arrage
        const num1 = 10;
        const num2 = 20;
        //2 Act
        const result = num1 + num2;
        //3 Assert
        expect(result).toBe(30);
    })

    test('should not be 30', () => { //it('should be true', () => {
        //1 Arrage
        const num1 = 15;
        const num2 = 20;
        //2 Act
        const result = num1 + num2;
        //3 Assert
        expect(result).not.toBe(30);
    })
});