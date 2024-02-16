"use strict";

module.exports = {
    meta: {
        type: "problem",
        docs: {
            description: "Private method should only be accessed within the class"
        },
        fixable: "code",
        schema: []
    },
    create(context) {
        return {
          MemberExpression(expression) {
            var name = expression.property.name;
            const isPrivateMethod = name.startsWith('_');
            if (isPrivateMethod && expression.object.type !== 'ThisExpression') {
              context.report({
                node: expression.property,
                message: `Private method is inaccessible from outside.`,
              });
            }
          },
        };
    }
};

