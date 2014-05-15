import java.util.Arrays;
import java.util.Scanner;


public class SortArrayOfStrings {

	public static void main(String[] args) {
		Scanner n = new Scanner(System.in);
		int number = n.nextInt();
		
		String[] strArr = new String[number];

		for (int i = 0; i < number; i++) {
			strArr[i] = n.next("\\w+");
		}
		n.close();
		
		Arrays.sort(strArr);
		
		for (int i = 0; i < number; i++) {
			System.out.println(strArr[i]);
		}
		
	}

}
