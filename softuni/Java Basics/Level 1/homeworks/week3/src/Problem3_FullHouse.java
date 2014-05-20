public class Problem3_FullHouse {

	public static void main(String[] args) {

		char spato = '\u2663';
		char karo = '\u2666';
		char kupa = '\u2665';
		char pika = '\u2660';

		String[] faces = { "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A" };
		char[] suits = { spato, karo, kupa, pika };

		int count = 0;

		for (int i = 0; i < faces.length; i++) { // номер на първите карти
			for (int j = 0; j < faces.length; j++) { // номер на вторите карти
				for (int j2 = 0; j2 < suits.length; j2++) { // първа боя
					for (int k = j2 + 1; k < suits.length; k++) {
						for (int k2 = k + 1; k2 < suits.length; k2++) {
							for (int l = 0; l < suits.length; l++) {
								for (int l2 = l + 1; l2 < suits.length; l2++) {
									if (i != j) {
										System.out.printf(
												"%s%c %s%c %s%c %s%c %s%c\n",
												faces[i], suits[j2], faces[i],
												suits[k], faces[i], suits[k2],
												faces[j], suits[l], faces[j],
												suits[l2]);
										count++;
									}

								}

							}

						}
					}
				}
			}
		}
		System.out.print(count + " full houses");
	}

}
