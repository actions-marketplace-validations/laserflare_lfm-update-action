const core = require('@actions/core');
const { existsSync, createReadStream } = require('fs');
const { request, gql } = require('graphql-request');

const endpoint = 'https://api-m.laserflare.net/gql';

const updateResource = gql`
	mutation update($id: String!, $input: UpdateInput, $file: Upload) {
		publishUpdate(id: $id, input: $input, file: $file)
	}
`;

function initValue(value) {
	if (!value) return null;
	if (typeof value === 'string')
		if (value.startsWith('{')) return value;
		else return `{"en": "${value}"}`;
	else core.setFailed(`Invalid value type: value must be string`);
}

async function update() {
	const file = core.getInput('file-path') || null;
	try {
		let str;
		if (file)
			if (!existsSync(file))
				core.setFailed('File path specified, but not exists');
			else str = createReadStream(file);
		const payload = {
			id: core.getInput('resource-id'),
			input: {
				version: core.getInput('version'),
				title: initValue(core.getInput('title')),
				subtitle: initValue(core.getInput('subtitle')),
				description: initValue(core.getInput('description')),
			},
			file: str,
		};
		const res = await request(endpoint, updateResource, payload, {
			authorization: `Bearer ${core.getInput('api-token')}`,
		});
		console.log(res);
		core.setOutput(res.publishUpdate);
	} catch (error) {
		core.setFailed(error.message);
	}
}

update();
