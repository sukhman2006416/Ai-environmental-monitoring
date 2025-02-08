import * as tf from '@tensorflow/tfjs-node'; // Use '@tensorflow/tfjs-node-gpu' if using GPU version

console.log('TensorFlow.js version:', tf.version.tfjs);

// Create a simple tensor to test
const tensor = tf.tensor([1, 2, 3, 4]);
tensor.print();
