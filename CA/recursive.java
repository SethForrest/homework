
/*
Option 2: Recursice Story Generator
The input to this program is a List of String “actors”, consisting of:
child, frog, bear, weasel.
The output of the program is a bedtime story (String).
Write a program that will output the following story:

A child couldn't sleep, so the child’s mother told a story about a little frog,
  who couldn't sleep, so the frog's mother told a story about a little bear,
    who couldn't sleep, so the bear's mother told a story about a little weasel,
      ...and the little weasel fell asleep.
    ...and the little bear fell asleep.
  ...and the little frog fell asleep.
...and the little child fell asleep.
*/

/**
  * To run the story generator compile using "javac recursive.java"
  * then run with "java recursive"
  *
  * Alternatly you can specify a cast for the story by supplying command line
  * arguments:
  *   "java recursive <args>"
      ie. "java recursive squirrel car pony rocket"
  */

import java.util.*;
public class recursive{


  static String story_loop(String[] actors, Integer index){

    // Getting indentation correct
    String spaces = "";
    for(Integer i = 0; i<index; i++){
      spaces += "  " ; // add 2 spaces for each layer
    }
    String story_part = "";
    if( index != 3){
      story_part += spaces;
    }

    if( actors.length != index+1 ){
      // the second and third lines have a "who"
      if( index == 1 || index == 2 ){
        story_part += "who";
      }

      // main first story part
      story_part += " couldn't sleep, so the "+ actors[index] + "'s mother told a story about a little " + actors[index+1] + ",\n" +story_loop(actors, index+1);

    }

    // second story part
    story_part += spaces + "...and the little " + actors[index] + " fell asleep.\n";

    return story_part;
  }

  


  public static void main( String[] args){
    // Declare variables
    String story = "\n\n";
    String[] actors;

    // allows for command line actor list
    if ( args.length != 0 ){
      actors = args;
    } else {
      actors = new String[] {"child", "frog", "bear", "weasel"};
    }

    // write the story
    story += "A " + actors[0] + story_loop(actors, 0);
    // print the story
    System.out.print( story + "\n\n" );
  }


}
