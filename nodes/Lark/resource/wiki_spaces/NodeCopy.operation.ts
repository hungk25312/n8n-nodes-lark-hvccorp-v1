import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperation } from '../../../help/type/IResource';

export default {
	name: 'Copy Wiki Space Node',
	value: 'copySpaceNode',
	order: 90,
	options: [
		{
			displayName: 'Wiki Space ID',
			name: 'space_id',
			type: 'string',
			required: true,
			default: '',
		},
		{
			displayName: 'Node Token',
			name: 'node_token',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
		},
		{
			displayName: 'Target Parent Node Token',
			name: 'target_parent_token',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Target parent node token, cannot be empty at the same time as Target Wiki Space ID',
		},
		{
			displayName: 'Target Wiki Space ID',
			name: 'target_space_id',
			type: 'string',
			default: '',
			description: 'Target wiki space ID, cannot be empty at the same time as Target Parent Node Token',
		},
		{
			displayName: 'New Title',
			name: 'title',
			type: 'string',
			default: '',
			description: 'New title after copying. Leave empty for no title. If not provided, uses the original node title',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const spaceId = this.getNodeParameter('space_id', index) as string;
		const nodeToken = this.getNodeParameter('node_token', index) as string;
		const targetParentToken = this.getNodeParameter('target_parent_token', index) as string;
		const targetSpaceId = this.getNodeParameter('target_space_id', index) as string;
		const title = this.getNodeParameter('title', index) as string;

		const body: IDataObject = {};

		if (targetParentToken) {
			body.target_parent_token = targetParentToken;
		}
		if (targetSpaceId) {
			body.target_space_id = targetSpaceId;
		}
		if (title !== undefined) {
			body.title = title;
		}

		return RequestUtils.request.call(this, {
			method: 'POST',
			url: `/open-apis/wiki/v2/spaces/${spaceId}/nodes/${nodeToken}/copy`,
			body,
		});
	},
} as ResourceOperation;
