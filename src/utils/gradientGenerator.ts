export default class GradientGenerator {
  static generateGradient(id: number): string {
    const gradients = [
      'bg-gradient-to-r from-pink-500 to-yellow-500',
      'bg-gradient-to-r from-green-400 to-blue-500',
      'bg-gradient-to-r from-purple-400 to-pink-500',
      'bg-gradient-to-r from-indigo-500 to-purple-500',
      'bg-gradient-to-r from-teal-400 to-blue-400',
    ];

    const index = id % gradients.length;
    return gradients[index];
  }
}
