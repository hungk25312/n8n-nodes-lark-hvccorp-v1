import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperation } from '../../../help/type/IResource';

export default {
	name: 'Get Wiki Space Child Node List',
	value: 'getSpaceNodeChildren',
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
			displayName: 'Parent Node Token',
			name: 'parent_node_token',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
		{
			displayName: 'Page Size',
			name: 'page_size',
			type: 'number',
			default: 20,
			description: 'Page size, maximum value is 50',
		},
		{
			displayName: 'Page Token',
			name: 'page_token',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Page token, leave empty for the first request',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const spaceId = this.getNodeParameter('space_id', index) as string;
		const parentNodeToken = this.getNodeParameter('parent_node_token', index) as string;
		const pageSize = this.getNodeParameter('page_size', index) as number;
		const pageToken = this.getNodeParameter('page_token', index, '') as string;

		const qs: IDataObject = {
			page_size: pageSize,
		};

		if (parentNodeToken) {
			qs.parent_node_token = parentNodeToken;
		}

		if (pageToken) {
			qs.page_token = pageToken;
		}

		return RequestUtils.request.call(this, {
			method: 'GET',
			url: `/open-apis/wiki/v2/spaces/${spaceId}/nodes`,
			qs,
		});
	},
} as ResourceOperation;
