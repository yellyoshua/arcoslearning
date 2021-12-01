// @ts-check
/**
 * @typedef {import('react-toastify').UpdateOptions} UpdateOptions
 * @typedef {import('react-toastify').ToastOptions} ToastOptions
 */
import { toast } from 'react-toastify';

export const useToast = () => {
	/**
	 * @param {string} message
	 * @param {ToastOptions | undefined} options
	 */
	const fireToastError = (message, options) => toast.error(message, options);

	/**
	 * @param {string} message
	 * @param {ToastOptions | undefined} options
	 */
	const fireToastSuccess = (message, options) =>
		toast.success(message, options);

	/**
	 * @param {Promise<any>} promise
	 * @param {{pending?: string | UpdateOptions; success?: string | UpdateOptions; error?: string | UpdateOptions;}} options
	 */
	const fireToastPromise = async (promise, options) =>
		await toast.promise(promise, options);

	return { fireToastError, fireToastSuccess, fireToastPromise };
};
