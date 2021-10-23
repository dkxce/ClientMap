using System;
using System.IO;
using System.Collections.Generic;
using System.Text;
using System.Runtime.InteropServices;

namespace ConsoleApplication1
{
    class Program
    {
        [DllImport("kernel32.dll")]
        static extern IntPtr GetConsoleWindow();

        [DllImport("user32.dll")]
        static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);

        [DllImport("kernel32.dll")]
        static extern bool FreeConsole();

        static void Main(string[] args)
        {
            int port = 80;

            if ((args != null) && (args.Length > 0) && ((args[0] == "/cgi") || args[0] == "/cgi-bin"))
            {
                SimpleServersPBAuth.CGIBINModule.Test();
                return;
            };

            bool noconsole = false;
            if ((args != null) && (args.Length > 0)) int.TryParse(args[0], out port);
            if ((args != null) && (args.Length > 1) && (args[1] == "/noconsole")) noconsole = true;

            Console.WriteLine("clientmap.js demo");
            Console.Write("  Local IP: ");
            ListLocalIPAddresses();
            Console.WriteLine();
            // // // // 
            SimpleServersPBAuth.HttpServer iServ = new SimpleServersPBAuth.HttpServer(port);
            iServ.OnlyHTTPClients = true;
            //iServ.ServerName = "TEST 0.1";
            iServ.AuthentificationRequired = false;
            //
            iServ.ListenIPDeniedSendError = false;
            //
            iServ.HomeDirectory = SimpleServersPBAuth.TTCPServer.GetCurrentDir();
            iServ.AllowBrowseDownloads = true;
            iServ.AllowBrowseFiles = true;
            iServ.AllowBrowseDirectories = true;
            iServ.AllowBrowseBigFiles = true;
            Dictionary<string, string> headers = iServ.Headers;
            headers.Add("Test", "Test");
            iServ.Headers = headers;
            iServ.Start();
            Console.WriteLine("  started at port " + iServ.ServerPort.ToString());
            // // // // 
            string cPID = System.Diagnostics.Process.GetCurrentProcess().Id.ToString();
            try
            {
                FileStream fs = new FileStream(SimpleServersPBAuth.TTCPServer.GetCurrentDir() + @"\dkxceHTTPServer.pid", FileMode.OpenOrCreate, FileAccess.Write);
                byte[] bPID = System.Text.Encoding.ASCII.GetBytes(cPID);
                fs.Write(bPID, 0, bPID.Length);
                fs.Close();
            }
            catch { };
            // // // // 
            if (noconsole)
            {
                System.Threading.Thread.Sleep(2000);
                IntPtr cHnd = GetConsoleWindow();
                FreeConsole(); // Отвязываемся от консоли
                ShowWindow(cHnd, 0); // Скрываем консоль
                while (true)
                    System.Threading.Thread.Sleep(2000);
            };
            // // // // 
            Console.WriteLine("Press ENTER to STOP");
            Console.ReadLine();
            iServ.Stop();
        }

        static void ListLocalIPAddresses()
        {
            System.Net.IPHostEntry host = System.Net.Dns.GetHostEntry(System.Net.Dns.GetHostName());
            foreach (System.Net.IPAddress ip in host.AddressList)
                if (ip.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork)
                    Console.Write(ip.ToString()+" ");
        }
    }
}
