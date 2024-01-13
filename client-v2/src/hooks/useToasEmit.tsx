import { toast } from 'react-toastify';
import type {ToastOptions, UpdateOptions} from 'react-toastify';

export default function useToasEmit() {
	return {
		error(message: string, options?: ToastOptions) {
			return toast.error(message, options)
		},
		message(message: string, options?: ToastOptions) {
			return toast.success(message, options)
		},
		async wait(promise: Promise<any>, promiseOptions: {pending?: string | UpdateOptions; success?: string | UpdateOptions; error?: string | UpdateOptions;}, options?: ToastOptions) {
			return await toast.promise(promise, promiseOptions, options);
		}
	};
}
