import { isObject } from "lodash";


export default abstract class EnumGroup {
	static translate(data, language) {

		if (Array.isArray(data)) {
			return data.map(obj => translateObject(this, obj, language));
		} else {
			return translateObject(this, data, language);
		}
	}

	static allEnumFields() {
		const allEnumFields = {}

		Object.entries(this).filter(([k, v]) => !/^__.*/.test(k)).forEach(([key, value]) => {
			allEnumFields[lowerize(key)] = value.fields();
		});

		return allEnumFields;
	}


}


function translateObject(self, obj, language) {
	const translatedObject = { ...obj };

	for (let [attr, value] of Object.entries(obj)) {
		if (!value) continue;

		const toBeTranslatedAttr = self[capitalize(attr)] || self.__additionalTranslationKeys && self.__additionalTranslationKeys.find(k => k.attr == attr);

		if (toBeTranslatedAttr) {
			const translationKeyPrefix = toBeTranslatedAttr.__translationKeyPrefix || `${self.name.toLowerCase()}.enum.${attr}`;

			if (Array.isArray(value)) {
				translatedObject[attr] = value.map(v => trnslateValue(translationKeyPrefix, v, language));
			} else
				translatedObject[attr] = trnslateValue(translationKeyPrefix, value, language);

		}
	}

	return translatedObject;
}


function trnslateValue(translationKeyPrefix, value: any, language) {

	let valueFullObject = {};
	if (isObject(value)) {
		valueFullObject = { ...value };
		value = value["id"];
	}
	const phrase = `${translationKeyPrefix}.${value}`;
	//@ts-ignore
	const label = sails.__({ phrase, locale: language });

	return {
		...valueFullObject,
		id: value,
		label
	};

}


function capitalize(word) {
	return word[0].toUpperCase() + word.slice(1);
}


function lowerize(string) {
	return string.charAt(0).toLowerCase() + string.slice(1);
}