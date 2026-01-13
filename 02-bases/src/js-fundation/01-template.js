const emailTemplate = `
    <div>
        <h1>Hi, {{name}}</h1>
        <p>Thank you for your order.</p>
        <p>Order {{orderId}}.</p>
    </div>
`;

module.exports = {
    emailTemplate,
};

// console.log(emailTemplate);
