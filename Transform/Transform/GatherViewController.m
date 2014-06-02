//
//  GatherViewController.m
//  Transform
//
//  Created by Kevin Liang on 5/31/14.
//  Copyright (c) 2014 Code4Kingdom. All rights reserved.
//

#import "GatherViewController.h"

@interface GatherViewController ()

@end

@implementation GatherViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    [self loadCurrentLocalUrl:@"meetings"];
    
    self.title = @"Gather";
}

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/


#pragma mark - sending text
- (IBAction)shareAction:(id)sender
{
    if([MFMessageComposeViewController canSendText]) {
        NSString *message = [NSString stringWithFormat:@"Come hang out in my small group with me this Tuesday, 7:30pm @ 1 Trinity ave, Redwood City"];
        
        MFMessageComposeViewController *messageController = [[MFMessageComposeViewController alloc] init];
        messageController.messageComposeDelegate = self;
        [messageController setBody:message];
        
        // Present message view controller on screen
        [self presentViewController:messageController animated:YES completion:nil];
    }
}

- (void)messageComposeViewController:(MFMessageComposeViewController *)controller didFinishWithResult:(MessageComposeResult) result
{
    switch (result) {
        case MessageComposeResultCancelled:
        break;
        
        case MessageComposeResultFailed:
        {
            UIAlertView *warningAlert = [[UIAlertView alloc] initWithTitle:@"Error" message:@"Failed to send SMS!" delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil];
            [warningAlert show];
            break;
        }
        
        case MessageComposeResultSent:
        {
            UIAlertView *warningAlert = [[UIAlertView alloc] initWithTitle:@"Spread the good news" message:@"For He is good!" delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil];
            [warningAlert show];
        }
        break;
        
        default:
        break;
    }
    
    [self dismissViewControllerAnimated:YES completion:nil];
}
@end
