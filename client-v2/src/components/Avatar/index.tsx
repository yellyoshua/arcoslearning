
type AvatarProps = {
	image: string;
	onPress?: () => void;
};

export default function Avatar({image, onPress}: AvatarProps) {
	return (
		<div className="flex items-center mx-2">
			<div className="flex-shrink-0">
				<img className="h-10 w-10 rounded-full object-cover cursor-pointer" onClick={onPress} src={image} alt="" />
			</div>
		</div>
	);
}
