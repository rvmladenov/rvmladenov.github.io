import java.util.Scanner;

public class Problem7_CountOfBitsOne {

	public static void main(String[] args) {
		try(Scanner sc = new Scanner(System.in)) {
			int n = sc.nextInt();
			
			System.out.println(Integer.bitCount(n));
		}
	}

}
