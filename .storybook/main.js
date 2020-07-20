module.exports = {
	stories: ['../src/**/*.stories.ts'],
	addons: ['@storybook/addon-knobs/register'],
	webpackFinal: async (config) => {
		config.module.rules.push({
			test: /\.ts$/,
			use: [
				{
					loader: require.resolve('ts-loader'),
				},
			],
		});
		config.resolve.extensions.push('.ts');
		return config;
	},
};
