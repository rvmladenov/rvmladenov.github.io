import java.util.Scanner;

public class Problem5_AngleUnitConverter {

	public static void main(String[] args) {
		try(Scanner sc = new Scanner(System.in)) {
			
			int n = Integer.parseInt(sc.nextLine());
			
			for (int i = 0; i < n; i++) {

				/* Read the new input */
				String input = sc.nextLine();
				
				String separator = " ";
				String[] inputParams = input.split(separator);
				
				double number = Double.parseDouble(inputParams[0]);
				String measure = inputParams[1];

				if(measure.equals("deg") || measure.equals("rad")) {
					
					System.out.printf("%1$f %2$s \n", calcResult(number, measure), (measure.equals("rad")) ? "deg" : "rad");
				} else {
					throw new IllegalArgumentException();
				}	
			}
			
		}
		
	}
	
	public static double calcResult(double num, String measure) {
		double result = 0;
		
		switch (measure) {
			case "deg":
				result = ((num*Math.PI)/180);
			break;
			case "rad":
				result = ((num*180)/Math.PI);
			break;
	
			default:
				break;
		}
		
		return result;
	}
}
