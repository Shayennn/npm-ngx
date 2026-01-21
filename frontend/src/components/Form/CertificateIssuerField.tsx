import { Field, useFormikContext } from "formik";
import { useEffect } from "react";
import { intl, T } from "src/locale";

interface Props {
	name?: string;
	labelId?: string;
	helperId?: string;
}

const getValueAtPath = (values: any, path: string) => {
	return path.split(".").reduce((acc: any, key) => (acc ? acc[key] : undefined), values);
};

const ensureDefaultValue = (values: any, setFieldValue: (name: string, value: any) => void, name: string) => {
	const current = getValueAtPath(values, name);
	if (typeof current === "undefined" || current === null || current === "") {
		setFieldValue(name, "letsencrypt");
	}
};

export function CertificateIssuerField({ name = "provider", labelId = "certificates.issuer", helperId }: Props) {
	const { values, setFieldValue } = useFormikContext();
	const fieldName = name;
	const fieldId = fieldName.replaceAll(".", "-");

	useEffect(() => {
		ensureDefaultValue(values, setFieldValue, fieldName);
	}, [fieldName, setFieldValue, values]);

	return (
		<Field name={fieldName}>
			{({ field }: any) => (
				<div className="mb-3">
					<label htmlFor={fieldId} className="form-label">
						<T id={labelId} />
					</label>
					<select id={fieldId} className="form-select" {...field}>
						<option value="letsencrypt">{intl.formatMessage({ id: "lets-encrypt" })}</option>
						<option value="gts">{intl.formatMessage({ id: "gts" })}</option>
					</select>
					{helperId ? (
						<small className="form-text text-muted">
							<T id={helperId} />
						</small>
					) : null}
				</div>
			)}
		</Field>
	);
}
