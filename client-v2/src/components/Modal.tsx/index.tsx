import { createPortal } from 'react-dom';

type ModalProps = {
	children: React.ReactNode;
	onClose: () => void;
	isOpen: boolean;
};

export default function Modal({ children, onClose, isOpen }: ModalProps) {
	if (!isOpen) return null;

	return createPortal(
		<div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50'>
			<div className='bg-white rounded-lg p-4'>
				{children}
			</div>
		</div>,
		document.getElementById('modal-root') as HTMLElement
	);
}
