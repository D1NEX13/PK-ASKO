import type { ReactNode } from 'react';

function Map(): ReactNode {
	return (
		<div
			style={{
				position: 'relative',
				overflow: 'hidden',
				padding: '24px 96px 0px 96px',
			}}
		>
			<iframe
				src="https://yandex.com/map-widget/v1/?ll=47.545514%2C55.507500&z=16&pt=47.545514,55.507500,pm2rdm"
				width="100%"
				height="500"
				allowFullScreen={true}
				style={{ position: 'relative', border: 0 }}
			></iframe>
		</div>
	);
}

export default Map;
