require('dotenv').config();  // Memuat variabel lingkungan dari file .env
const tf = require('@tensorflow/tfjs-node');

async function loadModel() {
    // Memastikan URL untuk model tersedia
    const modelUrl = process.env.MODEL_URL;

    if (!modelUrl) {
        throw new Error('MODEL_URL belum didefinisikan di file .env');
    }

    try {
        // Memuat model menggunakan URL yang disediakan
        const model = await tf.loadGraphModel(modelUrl);
        console.log('Model berhasil dimuat');
        return model;
    } catch (error) {
        console.error('Gagal memuat model:', error);
        throw new Error('Gagal memuat model');
    }
}

module.exports = loadModel;
