import { ExpressHandlerDescriptor } from '../types';

export default (useNext: boolean = false) => {
  return (targe: any, key: string | Symbol, descriptor: ExpressHandlerDescriptor) => {
    const method = descriptor.value;

    descriptor.value = async function (...args) {
      try {
        await method.apply(this, args);
      } catch (error) {
        console.error(error);
        const [, res, next] = args;

        if (useNext) next();
        else res.status(400).json({ message: 'Ooops, something went wrong!' });
      }
    };
  };
};
