import java.util.Arrays;
import java.util.Scanner;


public class SortArrayOfStrings {

	public static void main(String[] args) {
		Scanner n = new Scanner(System.in);
		int number = n.nextInt();
		
		String[] strArr = new String[number];

		// Kogato ispolzvame "n.nextLine();" to 4ete vsi4ko do kraq na reda, no 
		// ako predi tova sme izpolzvali naprimer "n.nextInt();", to tova "do kraq na reda" e realno do
		// kraq na na vavedenata stoinost. I zatova e nujen ssledva6tiq red
		n.nextLine();
		for (int i = 0; i < number; i++) {
			// TODO: Play with the reg expressions
			// strArr[i] = n.nextLine("\\w+");
			strArr[i] = n.nextLine("\\w+");
		}
		n.close();
		
		Arrays.sort(strArr);
		
		for (int i = 0; i < number; i++) {
			System.out.println(strArr[i]);
		}
		
	}

}
