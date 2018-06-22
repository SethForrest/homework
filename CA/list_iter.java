

/*
Option 1: List Iteration
The input is a List of String student ids, and the output is a Map of String
to Integer where the String is the student id and the Integer is the number
of times the student id showed up in the input List.
*/

/**
  * To run the code compile using "javac list_iter.java"
  * then run with "java list_iter"
  *
  * If you want to specify a list in the command line run with
  * "java list_iter <args>"
  *
  */

import java.util.*;
public class list_iter{


  static Map<String, Integer> Count_Students(String[] student_ids){
    /**
      * This function will take a list of student ids and output a
      * map<str, int> counting appearances of a student id in the list
      */
    Map<String, Integer> student_count = new HashMap<String, Integer>();
    for (String student : student_ids){
      Integer count = student_count.get(student);
      student_count.put(student, (count == null) ? 1 : count + 1);
    }
    return student_count;
  }


  public static void main( String[] args){
    // Declare values to be passed to/from the function
    String[] student_ids ;
    Map<String, Integer> student_counts;

    // allows list to be input via command line arguments, or use default list
    if( args.length == 0){
      student_ids = new String[] {"3125477", "8675309", "2254789", "8675309" };
    } else {
      student_ids = args;
    }

    student_counts = Count_Students(student_ids);

    // print the values
    System.out.println( student_counts );
  }


}
