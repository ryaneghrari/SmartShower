const PersistentAttributesHandler = {
    canHandle(handlerInput) {
        return new Promise((resolve, reject) => {
            handlerInput.attributesManager.getPersistentAttributes()
                .then((attributes) => {
                    resolve(attributes['foo'] === 'bar');
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },
    handle(handlerInput) {
        return new Promise((resolve, reject) => {
            handlerInput.attributesManager.getPersistentAttributes()
                .then((attributes) => {
                    attributes['foo'] = 'bar';
                    handlerInput.attributesManager.setPersistentAttributes(attributes);

                    return handlerInput.attributesManager.savePersistentAttributes();
                })
                .then(() => {
                    resolve(handlerInput.responseBuilder.getResponse());
                })
                .catch((error) => {

                        reject(error);
                });
        });
    }
};
