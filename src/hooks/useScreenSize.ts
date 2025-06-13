import { useMediaQuery, useWindowSize } from '@uidotdev/usehooks';

export const useScreenSize = () => {
	const { width, height } = useWindowSize();

	const isLandscape = useMediaQuery('only screen and (orientation: landscape)');
	const isPortrait = useMediaQuery('only screen and (orientation: portrait)');

	const isScreenMobile = useMediaQuery('only screen and (max-width : 640px)');
	const isScreenTablet = useMediaQuery(
		'only screen and (min-width : 641px) and (max-width : 1024px)'
	);
	const isScreenDesktop = useMediaQuery('only screen and (min-width : 1025px)');
	const isScreenLowerThen300px = useMediaQuery('only screen and (max-width : 300px)');

	return {
		width,
		height,
		isLandscape,
		isPortrait,
		isScreenMobile,
		isScreenTablet,
		isScreenDesktop,
		isScreenLowerThen300px,
	};
};
